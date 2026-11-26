/**
 * The lens preview: one inert, aria-hidden clone of <main> rendered in the Inside
 * state, laid over the page at the same page coordinates. The caller clips it
 * with a circle that follows the pointer.
 */
const ID_PREFIX = 'lens-preview-';

/** Attributes that point at an id with url(#id) or #id; they must follow the renamed ids. */
const URL_REFERENCES = '[filter], [mask], [clip-path], [fill], [stroke]';

export interface Preview {
  layer: HTMLElement;
  /** Document-space y of the layer's top edge, to convert page coordinates. */
  top: number;
}

export function createPreview(main: HTMLElement): Preview {
  const clone = main.cloneNode(true) as HTMLElement;
  clone.removeAttribute('id');
  clone.removeAttribute('tabindex');
  clone.dataset.lens = 'inside';
  // The lens control lives inside <main>; the preview shows the page, not the control that draws it.
  clone.querySelector('[data-lens-dock]')?.remove();

  // The real page keeps every id, so anchors, labels and url(#id) references resolve there.
  for (const element of clone.querySelectorAll('[id]')) element.id = ID_PREFIX + element.id;
  for (const element of clone.querySelectorAll(URL_REFERENCES)) {
    for (const name of ['filter', 'mask', 'clip-path', 'fill', 'stroke']) {
      const value = element.getAttribute(name);
      if (value?.includes('url(#')) element.setAttribute(name, value.replaceAll('url(#', `url(#${ID_PREFIX}`));
    }
  }

  for (const use of clone.querySelectorAll('use[href^="#"]')) {
    use.setAttribute('href', `#${ID_PREFIX}${use.getAttribute('href')!.slice(1)}`);
  }

  const top = main.getBoundingClientRect().top + window.scrollY;
  const layer = document.createElement('div');
  layer.className = 'lens-preview';
  layer.dataset.lensPreview = '';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  layer.style.top = `${top}px`;
  layer.style.height = `${main.offsetHeight}px`;
  layer.append(clone);
  return { layer, top };
}
