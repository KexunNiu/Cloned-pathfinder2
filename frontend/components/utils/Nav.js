/**
 * Navigate to the parent page
 */
export const gotoParentPage = (router) => {
  const pathArray = router.asPath.split('/');

  if (pathArray.length > 0) {
    pathArray.pop();
  }

  router.push(pathArray.join('/'));
};


/**
 * Replace the current page with a 404 page
 */
export const replaceWith404Page = (router) => {
  router.push('/404', router.asPath);
};
