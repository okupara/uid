import z from "zod";
import type { StandardSchemaV1 } from "@tanstack/react-form";

export const nameSchema = z
  .string()
  .min(1, "お名前を入力してください")
  .min(2, "お名前は2文字以上で入力してください");
export const emailScema = z
  .string()
  .min(1, "メールアドレスを入力してください")
  .email("有効なメールアドレスを入力してください");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  name: nameSchema,
  email: emailScema,
});

export const processStandardSchemaResult = ({
  result,
  onValid,
}: {
  result: ReturnType<StandardSchemaV1["~standard"]["validate"]>;
  onValid: () => void;
}) => {
  if (result instanceof Promise) throw Error("");
  if (result.issues) {
    return; // 今回は必要ないので何もしない
  }
  onValid();
};

export type FormData = z.infer<typeof formSchema>;
