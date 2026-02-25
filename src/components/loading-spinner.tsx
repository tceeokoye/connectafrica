import { LoadingSpinnerProps } from "@/types/global";

export const LoadingSpinner = ({ size = 22, color = "border-white" }: LoadingSpinnerProps) => {
  return (
     <div
      className={`border-2 border-t-transparent ${color} rounded-full animate-fast-spin`}
      style={{ width: size, height: size }}
    />
  );
};