import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const textfieldplaceholderinputVariants = cva(
  "rounded-md border",
  {
    variants: {
      Format: {
            Text: "",
            Addprefix: "",
            Addsuffix: "",
            Masked: ""
      },
      Typing: {
            No: "",
            Yes: ""
      }
},
    defaultVariants: {
    Format: "Text",
    Typing: "No"
}
  }
)

export interface TextFieldPlaceholderInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textfieldplaceholderinputVariants> {
  Edittext8520?: string;
  Format?: "Text" | "Addprefix" | "Addsuffix" | "Masked";
  Typing?: "No" | "Yes";
}

const TextFieldPlaceholderInput = React.forwardRef<HTMLDivElement, TextFieldPlaceholderInputProps>(
  ({ className, Format, Typing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(textfieldplaceholderinputVariants({ Format, Typing, className }))}
        {...props}
      />
    )
  }
)
TextFieldPlaceholderInput.displayName = "TextFieldPlaceholderInput"

export { TextFieldPlaceholderInput, textfieldplaceholderinputVariants }
