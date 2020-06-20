import React, { ElementType, FunctionComponent, AnchorHTMLAttributes } from 'react';
import getClassName from '../../helpers/getClassName';
import classNames from '../../lib/classNames';
import usePlatform from '../../hooks/usePlatform';
import { HasRootRef } from '../../types';

export interface LinkProps extends AnchorHTMLAttributes<HTMLElement>, HasRootRef<HTMLElement> {
  Component?: ElementType;
}

const Link: FunctionComponent<LinkProps> = ({
  children,
  className,
  Component,
  getRootRef,
  ...restProps
}: LinkProps) => {
  const platform = usePlatform();
  const baseClassName = getClassName('Link', platform);

  if (!Component) {
    if (restProps.href) {
      Component = 'a';
    } else {
      Component = 'button';
      restProps = { type: 'button', ...restProps };
    }
  }

  return (
    <Component {...restProps} ref={getRootRef} className={classNames(baseClassName, className)}>{children}</Component>
  );
};

export default Link;
