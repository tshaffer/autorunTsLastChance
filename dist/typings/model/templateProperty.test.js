import * as base from './templateProperty';
describe('templateProperty - action creator', function () {
    var testState = {
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }
    };
    var invalidTestStateOne = {
        color: {
            r: 0,
            g: -1,
            b: 0,
            a: 255
        }
    };
    var invalidTestStateTwo = {
        color: {
            r: 256,
            g: 0,
            b: 0,
            a: 255
        }
    };
    it('should create a template property reset action', function () {
        expect(base.bsUiModelResetTemplateProperty())
            .toMatchObject({ type: base.BSUIMODEL_RESET_TEMPLATE_PROPERTY, payload: null });
    });
    it('should create a template property update action', function () {
        expect(base.bsUiModelUpdateTemplateColor(testState.color))
            .toMatchObject({ type: base.BSUIMODEL_UPDATE_TEMPLATE_PROPERTY, payload: { color: testState.color } });
        expect(base.bsUiModelUpdateTemplateColor.bind(null, invalidTestStateOne.color)).toThrowError();
        expect(base.bsUiModelUpdateTemplateColor.bind(null, invalidTestStateTwo.color)).toThrowError();
    });
});
describe('templateProperty - reducer', function () {
    var testStateOne = {
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }
    };
    var testStateTwo = {
        color: {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }
    };
    it('should handle initial state', function () {
        var resetAction = base.bsUiModelResetTemplateProperty();
        expect(base.templatePropertyReducer(testStateOne, resetAction)).toMatchObject(testStateOne);
    });
    it('should handle rehydrate action state', function () {
        expect(base.templatePropertyReducer(testStateTwo, base.bsUiModelUpdateTemplateColor(testStateOne.color)))
            .toMatchObject(testStateOne);
    });
});
describe('templateProperty - validator', function () {
    var testState = {
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        }
    };
    var invalidTestStateOne = {
        color: {
            r: 0,
            g: -1,
            b: 0,
            a: 255
        }
    };
    var invalidTestStateTwo = {
        color: {
            r: 256,
            g: 0,
            b: 0,
            a: 255
        }
    };
    it('should validate state color with deep comparison', function () {
        expect(base.isValidColor(testState.color)).toBeTruthy();
        expect(base.isValidColor(Object.assign({}, { invalidField: 1 }, testState.color))).toBeTruthy();
        expect(base.isValidColor(invalidTestStateOne)).toBeFalsy();
        expect(base.isValidColor(invalidTestStateTwo)).toBeFalsy();
        expect(base.isValidColor({})).toBeFalsy();
        expect(base.isValidColor(null)).toBeFalsy();
        expect(base.isValidColor(undefined)).toBeFalsy();
        expect(base.isValidColor(0)).toBeFalsy();
        expect(base.isValidColor(1)).toBeFalsy();
        expect(base.isValidColor('string')).toBeFalsy();
        expect(base.isValidColor(true)).toBeFalsy();
    });
    it('should validate state with deep comparison', function () {
        expect(base.isValidTemplatePropertyState(testState)).toBeTruthy();
        expect(base.isValidTemplatePropertyState(Object.assign({}, { invalidField: 1 }, testState))).toBeTruthy();
        expect(base.isValidTemplatePropertyState(invalidTestStateOne)).toBeFalsy();
        expect(base.isValidTemplatePropertyState(invalidTestStateTwo)).toBeFalsy();
        expect(base.isValidTemplatePropertyState({})).toBeFalsy();
        expect(base.isValidTemplatePropertyState(null)).toBeFalsy();
        expect(base.isValidTemplatePropertyState(undefined)).toBeFalsy();
        expect(base.isValidTemplatePropertyState(0)).toBeFalsy();
        expect(base.isValidTemplatePropertyState(1)).toBeFalsy();
        expect(base.isValidTemplatePropertyState('string')).toBeFalsy();
        expect(base.isValidTemplatePropertyState(true)).toBeFalsy();
    });
    it('should validate state with shallow comparison', function () {
        expect(base.isValidTemplatePropertyStateShallow(testState)).toBeTruthy();
        expect(base.isValidTemplatePropertyStateShallow(Object.assign({}, { invalidField: 1 }, testState))).toBeTruthy();
        expect(base.isValidTemplatePropertyStateShallow({})).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow(null)).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow(undefined)).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow(0)).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow(1)).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow('string')).toBeFalsy();
        expect(base.isValidTemplatePropertyStateShallow(true)).toBeFalsy();
    });
});
//# sourceMappingURL=templateProperty.test.js.map