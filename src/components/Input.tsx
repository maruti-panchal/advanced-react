import React, { ComponentPropsWithoutRef } from 'react'

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
    </p>
  )
}
