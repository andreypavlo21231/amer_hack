import React, { useState, useRef } from "react";

const AddressInput = React.forwardRef((props, ref) => {
    const token = '9781d9e09dee46b2dfaee5ae243eeb1f115a637b';
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const timeoutId = useRef(null);
    const abortControllerRef = useRef(null);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        if (value.length > 2) {
            timeoutId.current = setTimeout(async () => {
                const controller = new AbortController();
                abortControllerRef.current = controller;

                try {
                    const response = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${token}`
                        },
                        body: JSON.stringify({ query: value, count: 20 }),
                        signal: controller.signal
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        setSuggestions(data.suggestions || []);
                    } else {
                        console.error("Error when requesting data:", response.statusText);
                    }
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.error("Error when receiving data DaData:", error);
                    }
                }
            }, 50);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.value);
        setSuggestions([]);
    };

    return (
        <div className="input-container">
            <label htmlFor="address" className="floating-label">Company address</label>
            <input
                type="text"
                className="form__input"
                name="company-input"
                required
                id="address"
                value={inputValue}
                onChange={handleInputChange}
                ref={ref}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default AddressInput;
