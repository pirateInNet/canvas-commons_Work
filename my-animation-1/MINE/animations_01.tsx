/**
 * Animate the appearance of an object.
 */
function* appear(object: Shape, duration = 1): ThreadGenerator {
    let scale = object.scale();

    yield* all(
        object.scale(0).scale(scale, duration),
        object.opacity(0).opacity(1, duration),
    );
}

function* disappear(object: Shape, duration = 1): ThreadGenerator {
    yield* all(
        object.opacity(0, duration),
    );
}


/**
 * Animate retyping a Txt object.
 */
import {waitFor} from '@canvas-commons/core';

function* retype(
  object: Txt,
  newValue = 'test',
  duration = 2,
): ThreadGenerator {
  const oldValue = object.text();

  let prefixLength = 0;
  while (
    prefixLength < oldValue.length &&
    prefixLength < newValue.length &&
    oldValue[prefixLength] === newValue[prefixLength]
  ) {
    prefixLength++;
  }

  let suffixLength = 0;
  while (
    suffixLength < oldValue.length - prefixLength &&
    suffixLength < newValue.length - prefixLength &&
    oldValue[oldValue.length - 1 - suffixLength] ===
      newValue[newValue.length - 1 - suffixLength]
  ) {
    suffixLength++;
  }

  const prefix = oldValue.slice(0, prefixLength);
  const suffix = suffixLength > 0 ? oldValue.slice(-suffixLength) : '';
  const oldMiddle = oldValue.slice(prefixLength, oldValue.length - suffixLength);
  const newMiddle = newValue.slice(prefixLength, newValue.length - suffixLength);
  const steps = oldMiddle.length + newMiddle.length;

  if (steps === 0) return;

  const stepDuration = duration / steps;

  for (let i = oldMiddle.length - 1; i >= 0; i--) {
    object.text(prefix + oldMiddle.slice(0, i) + suffix);
    yield* waitFor(stepDuration);
  }

  for (let i = 1; i <= newMiddle.length; i++) {
    object.text(prefix + newMiddle.slice(0, i) + suffix);
    yield* waitFor(stepDuration);
  }
}

