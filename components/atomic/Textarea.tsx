import React from 'react';

interface TextareaProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    minLength?: number;
    autoFocus?: boolean;
    spellCheck?: boolean;
    required?: boolean;
    autoComplete?: string;
    wrap?: string;
    label?: string;
}

const Textarea: React.FC<TextareaProps> = (
    {
        placeholder,
        value,
        onChange,
        className = '',
        rows = 3,
        cols,
        disabled = false,
        readOnly = false,
        maxLength,
        minLength,
        autoFocus = false,
        spellCheck = true,
        required = false,
        autoComplete,
        wrap,
        label
    }) => {
    return (
        <div className={'flex flex-col'}>
            {label && <label className={'font-body'}>{label}</label>}
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
                rows={rows}
                cols={cols}
                disabled={disabled}
                readOnly={readOnly}
                maxLength={maxLength}
                minLength={minLength}
                autoFocus={autoFocus}
                spellCheck={spellCheck}
                required={required}
                autoComplete={autoComplete}
                wrap={wrap}
            />
        </div>

    );
};

export default Textarea;

/* Example usage:
import Textarea from '@/components/atomic/Textarea';

const MyComponent = () => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <Textarea
            value={text}
            onChange={handleChange}
            placeholder="Enter your text here..."
            className="my-custom-class"
            rows={5}
            maxLength={500}
            required
        />
    );
};
*/