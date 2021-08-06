import { baselineComponent } from '../../testing/utils';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';
import { validImgProps } from '../../lib/utils';

describe('Avatar', () => {
  baselineComponent(Avatar);

  it('renders img only if src passed', () => {
    const { rerender } = render(<Avatar data-testid="avatar" src="#" />);
    const img = document.querySelector('img');
    expect(screen.getByTestId('avatar').contains(img)).toBeTruthy();
    rerender(<Avatar data-testid="avatar" />);
    expect(screen.getByTestId('avatar').contains(img)).toBeFalsy();
  });

  it('passes ref to the img', () => {
    const refCallback = jest.fn();
    render(<Avatar data-testid="avatar" src="#" getRef={refCallback} />);
    expect(refCallback).toBeCalled();
  });

  it('passes all img props to the img', () => {
    const props = validImgProps.reduce((acc: Record<string, string>, item) => {
      acc[item] = 'test';
      return acc;
    }, {});

    render(
      <Avatar
        data-testid="avatar"
        {...props}
      />,
    );

    const attributes = Object.values(document.querySelector('img').attributes).map((item) => item.name);

    expect(validImgProps.every((attr) => attributes.includes(attr.toLowerCase()))).toBeTruthy();
  });
});
