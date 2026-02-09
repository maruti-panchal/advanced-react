import React, { ComponentPropsWithoutRef } from 'react'

type ButtonProps = {
    el:'button';
}& ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
    el:'anchor';
}& ComponentPropsWithoutRef<'a'>;

export const Button = (props: ButtonProps | AnchorProps) => {
  if (props.el === 'button') {
    return <button className='button' {...props} />;
  } else {
    return <a className='button' {...props} />;
  }
}
