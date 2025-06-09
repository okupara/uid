"use client";

import { StandardSchemaV1, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";

// Zodバリデーションスキーマを定義
const nameSchema = z
  .string()
  .min(1, "お名前を入力してください")
  .min(2, "お名前は2文字以上で入力してください");
const emailScema = z
  .string()
  .min(1, "メールアドレスを入力してください")
  .email("有効なメールアドレスを入力してください");

const formSchema = z.object({
  name: nameSchema,
  email: emailScema,
});

const processStandardSchemaResult = ({
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

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const form1 = useForm({
    defaultValues: {
      name: "",
      email: "",
    } as FormData,
    onSubmit: async ({ value }) => {
      // フォーム送信処理
      console.log("Form submitted:", value);
      alert(`送信しました！\n名前: ${value.name}\nメール: ${value.email}`);
    },
  });

  const form2 = useForm({
    defaultValues: {
      name: "",
      email: "",
    } as FormData,
    onSubmit: async ({ value }) => {
      // フォーム送信処理
      console.log("Form submitted:", value);
      alert(`送信しました！\n名前: ${value.name}\nメール: ${value.email}`);
    },
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-sand-50">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <div className="min-w-[360px] px-2 pb-2 bg-olive-150 flex flex-col rounded-md">
          <div className="p-4">
            <h2 className="text-base font-medium text-center">
              Reward early, punish late と onBlur
            </h2>
          </div>
          <div className="bg-sand-50 p-4 rounded-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form1.handleSubmit();
              }}
              className="flex flex-col gap-4 w-full"
            >
              <form1.Field
                name="name"
                validators={{
                  onChange: (obj) => {
                    processStandardSchemaResult({
                      result: nameSchema["~validate"](obj.value),
                      onValid: () =>
                        obj.fieldApi.setErrorMap({ onBlur: undefined }),
                    });
                  },
                  onBlur: nameSchema,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-sand-900"
                      htmlFor={`${field.name}-1`}
                    >
                      お名前
                    </label>
                    <Input
                      id={`${field.name}-1`}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-600">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                )}
              </form1.Field>

              <form1.Field
                name="email"
                validators={{
                  onChange: (obj) => {
                    processStandardSchemaResult({
                      result: nameSchema["~validate"](obj.value),
                      onValid: () =>
                        obj.fieldApi.setErrorMap({ onBlur: undefined }),
                    });
                  },
                  onBlur: emailScema,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-sand-900"
                      htmlFor={field.name}
                    >
                      メールアドレス
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-600">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                )}
              </form1.Field>

              <div className="pt-4">
                <form1.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? "送信中..." : "送信"}
                    </Button>
                  )}
                </form1.Subscribe>
              </div>
            </form>
          </div>
        </div>

        <div className="min-w-[360px] px-2 pb-2 bg-olive-150 flex flex-col rounded-md">
          <div className="p-4">
            <h2 className="text-base font-medium text-center">onBlur のみ</h2>
          </div>
          <div className="bg-sand-50 p-4 rounded-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form2.handleSubmit();
              }}
              className="flex flex-col gap-4 w-full"
            >
              <form2.Field
                name="name"
                validators={{
                  onChange: (obj) => {
                    processStandardSchemaResult({
                      result: nameSchema["~validate"](obj.value),
                      onValid: () =>
                        obj.fieldApi.setErrorMap({ onBlur: undefined }),
                    });
                  },
                  onBlur: nameSchema,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-sand-900"
                      htmlFor={field.name}
                    >
                      お名前
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-600">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                )}
              </form2.Field>

              <form2.Field
                name="email"
                validators={{
                  onChange: (obj) => {
                    processStandardSchemaResult({
                      result: nameSchema["~validate"](obj.value),
                      onValid: () =>
                        obj.fieldApi.setErrorMap({ onBlur: undefined }),
                    });
                  },
                  onBlur: emailScema,
                }}
              >
                {(field) => (
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm text-sand-900"
                      htmlFor={field.name}
                    >
                      メールアドレス
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length > 0
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-sm text-red-600">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                )}
              </form2.Field>

              <div className="pt-4">
                <form2.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? "送信中..." : "送信"}
                    </Button>
                  )}
                </form2.Subscribe>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
