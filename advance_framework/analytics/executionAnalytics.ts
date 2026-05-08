export function executionAnalytics(results: any[]) {

    console.log('\nEXECUTION ANALYTICS\n');

    // SLOWEST TESTS
    const slowTests = results
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5);

    console.log('TOP SLOW TESTS');

    slowTests.forEach((test, index) => {
        console.log(
            `${index + 1}. ${test.title} - ${test.duration}ms`
        );
    });

    // FLAKY TESTS
    const flakyTests = results.filter(r => r.flaky);

    console.log('\nFLAKY TESTS');

    if (flakyTests.length === 0) {
        console.log('No flaky tests detected');
    }

    flakyTests.forEach(test => {
        console.log(`- ${test.title}`);
    });

    // FAILURE CATEGORY COUNT
    const categoryMap: any = {};

    results.forEach(result => {

        if (!categoryMap[result.category]) {
            categoryMap[result.category] = 0;
        }

        categoryMap[result.category]++;
    });

    console.log('\nFAILURE CATEGORIES');

    Object.keys(categoryMap).forEach(category => {
        console.log(`${category}: ${categoryMap[category]}`);
    });
}