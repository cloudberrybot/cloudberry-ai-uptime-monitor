import { chromium } from 'playwright';
import log from './logger';
import {
  ContentRequirementsResult,
  ContentTypes,
  Status,
  UptimeMonitorConfig,
  UptimeMonitorContentRequirements,
} from './types';

function checkContentRequirements(
  contentRequirements: UptimeMonitorContentRequirements[],
  pageContent: string
) {
  let contentRequirementsFulfilled = false;

  contentRequirements.forEach((requirement) => {
    const { type, value } = requirement;

    if (type === ContentTypes.TEXT) {
      if (pageContent.includes(value)) {
        contentRequirementsFulfilled = true;
      }
    }
  });

  return contentRequirementsFulfilled;
}

export default async function uptimeMonitorEngine({
  checks,
}: UptimeMonitorConfig) {
  Object.values(checks).forEach(async (site) => {
    let fulfilled = false;

    const { url, contentRequirements } = site;
    const browser = await chromium.launch();

    const page = await browser.newPage();

    try {
      await page.goto(url);

      const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
      );

      const navigationTiming = JSON.parse(navigationTimingJson);
      const duration = navigationTiming[0].duration;

      const pageContent = await page.textContent('body');

      fulfilled = checkContentRequirements(contentRequirements, pageContent);

      log({
        url: url,
        status: Status.UP,
        response_time: duration,
        content_requirements: fulfilled
          ? ContentRequirementsResult.FULFILLED
          : ContentRequirementsResult.FAILED,
      });
    } catch (error) {
      log({
        url: url,
        status: Status.DOWN,
        response_time: -1,
        content_requirements: fulfilled
          ? ContentRequirementsResult.FULFILLED
          : ContentRequirementsResult.FAILED,
      });
    }

    await browser.close();
  });
}
