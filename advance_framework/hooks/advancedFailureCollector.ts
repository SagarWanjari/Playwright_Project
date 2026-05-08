import fs from 'fs';
import path from 'path';

import { test } from '@playwright/test';

import { categorizeFailure } from '../classifiers/failureCategory';

const failureFile = path.join(
    process.cwd(),
    'advanced-failures.jsonl'
);

test.afterEach(async ({}, testInfo) => {

    console.log(
        `ADVANCED AFTER EACH: ${testInfo.title} ${testInfo.status}`
    );

    // Flaky Detection
    if (
        testInfo.retry > 0 &&
        testInfo.status === 'passed'
    ) {

        console.log(
            `FLAKY TEST DETECTED: ${testInfo.title}`
        );

        const flakyData = {
            title: testInfo.title,
            status: testInfo.status,
            retry: testInfo.retry,
            flaky: true,
            duration: testInfo.duration
        };

        fs.appendFileSync(
            failureFile,
            JSON.stringify(flakyData) + '\n'
        );
    }

    // Actual Failures
    if (
        testInfo.status === 'failed' ||
        testInfo.status === 'timedOut'
    ) {

        const errorMessage =
            testInfo.errors?.[0]?.message || 'Unknown Error';

        const failure = {
            title: testInfo.title,
            error: errorMessage,
            stack: testInfo.errors?.[0]?.stack,
            file: testInfo.file,
            status: testInfo.status,
            category: categorizeFailure(errorMessage),
            retry: testInfo.retry,
            duration: testInfo.duration,
            flaky: false
        };

        fs.appendFileSync(
            failureFile,
            JSON.stringify(failure) + '\n'
        );

        console.log('ADVANCED FAILURE WRITTEN');
    }
});