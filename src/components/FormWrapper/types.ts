interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

interface BaseFormElementProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: FormLabelProps | string | undefined;
  errorMessage?: string | undefined;
}

export interface FormWrapperProps extends BaseFormElementProps {
  children: JSX.Element | JSX.Element[];
}
