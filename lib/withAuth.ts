import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AuthenticationError, AuthorizationError, isAppError } from "./error";
import { Role } from "@prisma/client";
import logger from '@/logger';

type ServerAction<T extends any[], R> = (...args: T) => Promise<R>;

export function withAuth<T extends any[], R>(
  action: ServerAction<T, R>,
  allowedRoles?: Role[]
): ServerAction<T, R> {
  return async (...args: T): Promise<R> => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      logger.error('Authentication failed: No valid session');
      throw new AuthenticationError("You must be logged in to perform this action");
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = session.user.role as Role;
      if (!allowedRoles.includes(userRole)) {
        logger.warn(`Authorization failed: User role ${userRole} not in allowed roles [${allowedRoles.join(', ')}]`, {
          userId: session.user.id,
          action: action.name,
          allowedRoles,
          userRole
        });
        throw new AuthorizationError("You don't have permission to perform this action", {
          userRole,
          allowedRoles
        });
      }
    }

    logger.info(`Authorized action: ${action.name}`, {
      userId: session.user.id,
      userRole: session.user.role
    });

    return action(...args);
  };
}

export function handleActionError(error: unknown): {
  success: boolean;
  error: { message: string; type: string; details?: Record<string, unknown> };
} {
  if (isAppError(error)) {
    logger.error(`${error.type} occurred:`, { error });
    return {
      success: false,
      error: {
        message: error.message,
        type: error.type,
        details: error.details
      }
    };
  }

  logger.error('Unexpected error occurred:', { error });
  return {
    success: false,
    error: {
      message: "An unexpected error occurred. Please try again later.",
      type: 'UNKNOWN_ERROR'
    }
  };
}
