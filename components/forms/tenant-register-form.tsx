"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tenantCreateSchema } from "@/lib/validations/tenant";
import { useState } from "react";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { tenantCreate } from "@/lib/actions/tenant-actions";


type FormData = z.infer<typeof tenantCreateSchema>;

export function TenantRegistrationForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(tenantCreateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  async function onSubmit(data: FormData) {
    setIsSaving(true);
    try {
      const newTenant = await tenantCreate(data);
      if (newTenant.success) {
        toast({
          title: "Success",
          description: "Tenant registered successfully",
          variant: "default",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register tenant.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-5 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            <span>Register</span>
          </button>
        </form>
      </Form>
  );
}
