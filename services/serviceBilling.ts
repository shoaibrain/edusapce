import { feeConfig } from "@/assets/data/fees";

function getFees() {
  return feeConfig;
}

function getFee(classGrade: string) {
  return feeConfig[classGrade];
}

export { getFees, getFee };
