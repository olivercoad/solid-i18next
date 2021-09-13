import { Component } from 'solid-js';
import { renderToString } from 'solid-js/web';
import { TransProvider, useTransContext } from '../../src';
import { messages, resources_lt } from '../shared';

describe('TransProvider component', () => {
    function renderComponent(Comp: Component) {
        renderToString(() => <TransProvider children={<Comp />} />);
    }

    test('Should use TransContext', () => {
        renderComponent(() => {
            expect(useTransContext()).toBeInstanceOf(Array);
            return '';
        });
    });

    describe('Add resources', () => {
        test('Should be defined', () => {
            renderComponent(() => {
                const [, actions] = useTransContext();
                expect(actions.addResources).toBeDefined();
                return '';
            });
        });

        test('Adds resources', () => {
            renderComponent(() => {
                const [, actions] = useTransContext();
                actions.addResources('lt', 'translation', resources_lt.translation);
                expect(actions.getI18next().getResource('lt', 'translation', 'greeting')).toEqual(messages.simple.lt);
                return '';
            });
        });
    });
});