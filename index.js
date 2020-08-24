import { validateSingleValue } from './validateSingleValue';

/**
 * Check the validity of a single CSS value.
 *
 * @param {string} value - The value we want to validate.
 * @param {Object} args - Optional arguments.
 * @return {bool} - Returns whether the value is valid or not.
 */
export function validate( value, args ) {
    const allowMultiple = args.allowMultiple || true;
    let multiples;
    let multiplesValid = true;

    // Check for multiple values.
    multiples = value.split( ' ' );
    if ( 2 <= multiples.length ) {
        if ( allowMultiple ) {
            multiples.forEach( ( item ) => {
                if ( item && ! validateSingleValue( item, args ) ) {
                    multiplesValid = false;
                }
            });
            return multiplesValid;
        }
        return false;
    }

    return validateSingleValue( value, args );
}