import { fireEvent, render, screen } from '@testing-library/react';
import TaskForm from './task-form';

describe('Task Form component', () => {
  test('should render', () => {
    const title = 'To Do List';
    render(<TaskForm />);
    const headingElement = screen.getByRole('heading', { name: title });
    expect(headingElement).toBeInTheDocument();
  });

  test('should call handleSubmit on form submittion', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<TaskForm />);
    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    expect(formElement).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('handle submit');

    consoleSpy.mockRestore();
  });

  test('should call handleDelete on button press', () => {
    const task = 'Task to be deleted';
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<TaskForm />);
    const inputElement = screen.getByPlaceholderText('Enter a new task');
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.submit(screen.getByTestId('form'));

    const buttonElement = screen.getByRole('button', { name: 'Delete Task' });
    fireEvent.click(buttonElement);

    expect(consoleSpy).toHaveBeenCalledWith('handle delete', task);
  });
});
