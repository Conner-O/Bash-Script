function addSkuToName() {
  const itemCells = document.querySelectorAll('.facets-item-cell-grid');

  document.querySelectorAll('span[itemprop="name"]').forEach(function(nameSpan) {
    if (nameSpan.dataset.skuProcessed) return;

    const itemCell = nameSpan.closest('.facets-item-cell-grid');
    const sku = itemCell.getAttribute('data-sku');
    const skuElem = document.createElement('p');
    skuElem.textContent = sku;
    nameSpan.insertAdjacentElement('beforebegin', skuElem);

    // Mark the processed element to avoid processing it again
    nameSpan.dataset.skuProcessed = true;
  });
}

function onPageLoad() {
  addSkuToName();

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        addSkuToName();
      }
    });
  });

  const observerConfig = { childList: true, subtree: true };
  observer.observe(document.body, observerConfig);
}

if (document.readyState === 'loading') {
  document.addEventListener('load', onPageLoad);
} else {
  onPageLoad();
}
