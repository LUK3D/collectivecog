import { useCallback, useState } from "react";

function useInputValue(initialValue) {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((_, newValue) => setValue(newValue), [
        setValue,
    ]);
    const onAdd = useCallback((...args) => console.log(...args), []);

    return [value, onChange, onAdd];
}

export default useInputValue;
