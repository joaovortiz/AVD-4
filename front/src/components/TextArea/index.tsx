import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from "react";
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
}

const TextArea: React.FC<InputProps> = ({ name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const {
        fieldName, defaultValue, registerField
    } = useField(name);

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return(
        <Container isFilled={isFilled} isFocused={isFocused}>
            <textarea/>
        </Container>
    );
}

export default TextArea;