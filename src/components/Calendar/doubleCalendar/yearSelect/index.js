import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { HiddenElement } from '../../../Structural';
import { useUniqueIdentifier } from '../../../../libs/hooks';
import Options from './options';
import { StyledContainer, StyledSelect } from './styled';

export default function YearSelect(props) {
    const { currentYear, yearsRange, onYearChange } = props;
    const selectRef = useRef(null);
    const selectId = useUniqueIdentifier('select');
    const [isEditMode, setEditMode] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleYearChange = useCallback(
        value => {
            selectRef.current.blur();
            onYearChange(value);
        },
        [onYearChange],
    );

    const handleMouseEnter = useCallback(() => {
        if (!isFocused) setEditMode(true);
    }, [isFocused]);

    const handleMouseLeave = useCallback(() => {
        if (!isFocused) setEditMode(false);
    }, [isFocused]);

    const handleSelectFocus = useCallback(() => setIsFocused(true), []);
    const handleSelectBlur = useCallback(() => setIsFocused(false), []);

    useEffect(() => {
        setEditMode(isFocused);
    }, [isFocused]);

    return (
        <StyledContainer
            editMode={isEditMode}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <HiddenElement as="label" htmlFor={selectId}>
                select year
            </HiddenElement>
            <StyledSelect
                id={selectId}
                ref={selectRef}
                value={currentYear}
                editMode={isEditMode}
                onChange={handleYearChange}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
            >
                <Options options={yearsRange} />
            </StyledSelect>
        </StyledContainer>
    );
}

YearSelect.propTypes = {
    currentYear: PropTypes.number,
    yearsRange: PropTypes.arrayOf(PropTypes.object),
    onYearChange: PropTypes.func,
};

YearSelect.defaultProps = {
    currentYear: undefined,
    yearsRange: [],
    onYearChange: () => {},
};
