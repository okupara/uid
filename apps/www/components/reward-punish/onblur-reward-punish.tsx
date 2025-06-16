import { ArrowSquareOutIcon, CatIcon } from "@phosphor-icons/react";
import { FormContentLayout } from "./form-content-layout";
import { useForm } from "@tanstack/react-form";
import {
  emailScema,
  FormData,
  nameSchema,
  processStandardSchemaResult,
} from "./schema";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";
import { LinkStyle } from "@/registry/link";

export const OnBlurRewardPunishForm = () => {
  const form = useForm({
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
    <FormContentLayout
      iconRender={
        <CatIcon
          color="currentColor"
          className="text-sand-900"
          weight="regular"
          size={30}
        />
      }
      titleRender="onBlur + reward early, punish late"
      formRender={({ RootLayout, ItemLayout }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <RootLayout>
            <form.Field
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
                <ItemLayout>
                  <label className="text-sand-950" htmlFor={`${field.name}-1`}>
                    お名前
                  </label>
                  <Input
                    id={`${field.name}-1`}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-sm text-red-600">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </ItemLayout>
              )}
            </form.Field>

            <form.Field
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
                <ItemLayout>
                  <label className="text-sand-950" htmlFor={field.name}>
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
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="font-medium text-red-600">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </ItemLayout>
              )}
            </form.Field>

            <div className="pt-4">
              <form.Subscribe
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
              </form.Subscribe>
            </div>
          </RootLayout>
        </form>
      )}
      footerRender={
        <LinkStyle>
          <a
            href="https://www.google.com"
            className="text-sand-800 font-medium"
          >
            ソースコード
          </a>
          <ArrowSquareOutIcon
            color="currentColor"
            className="text-sand-800 mt-[-4px]"
            weight="regular"
            size={20}
          />
        </LinkStyle>
      }
    />
  );
};
