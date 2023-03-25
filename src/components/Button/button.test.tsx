import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button, { ButtonProps, ButtonType, ButtonSize } from './button';

const defaultProps = {
    onClick: jest.fn()
};

/* test('our first react test case', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  // expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
}) */

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
};

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
};

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice') as HTMLElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    });
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(
            <Button btnType={'link'} href="http://www.baidu.com">
                Link
            </Button>
        );
        const element = wrapper.queryByText('Link') as HTMLElement;
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});
