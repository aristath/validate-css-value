/**
 * Check the validity of a single CSS value.
 *
 * @param {string} value - The value we want to validate.
 * @param {Object} args - Optional arguments.
 * @return {bool} - Returns whether the value is valid or not.
 */
export function validateSingleValue( value, args ) {
    const validUnits = args.validUnits || [ 'fr', 'rem', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'vh', 'vw', 'vmin', 'vmax' ];
    const validValues = args.validValues || [ '0', 'auto', 'inherit', 'initial' ];
    const allowUnitless = args.allowUnitless || false;
    const allowCalc = args.allowCalc || true;
    const allowVar = args.allowVar || true;

    // Return true if the value is one of the hardcoded values that don't need further checking.
    if ( validValues.includes( value ) ) {
        return true;
    }

    // Skip further checks if using calc().
    if ( allowCalc && 0 <= width.indexOf( 'calc(' ) && 0 <= width.indexOf( ')' ) ) {
        return true;
    }

    // Skip further checks if using var().
    if ( allowVar && 0 <= width.indexOf( 'var(--' ) && 0 <= width.indexOf( ')' ) ) {
        return true;
    }

    // Get the numeric value.
    const numericValue = parseFloat( value );

    // Get the unit
    const unit = value.replace( numericValue, '' );

    // Early exit if we don't allow unitless and the current value doesn't hava unit.
    if ( ! allowUnitless && ! unit ) {
        return false;
    }

    // Check the validity of the numeric value and units.
    return ! isNaN( numericValue ) && -1 !== validUnits.indexOf( unit );
}