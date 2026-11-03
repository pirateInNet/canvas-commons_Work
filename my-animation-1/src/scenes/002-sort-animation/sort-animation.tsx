import {
	makeScene2D,
	Shape,
	Txt,
	Rect} from '@canvas-commons/2d';
import {
	all,
	createRef,
	useRandom,
	ThreadGenerator,
	waitFor, easeInOutCubic} from '@canvas-commons/core';

/**
 * Animate the appearance of an object.
 */
function* appearRect(object: Shape, duration = 1): ThreadGenerator {
	let h = object.height();

    yield* all(
        object.opacity(0).opacity(1, duration),
		object.height("0%").height(h, duration),
    );
}
/**
 * Animate the appearance of an object.
 */
function* disappear(object: Shape, duration = 1): ThreadGenerator {
    yield* object.opacity(0, duration);
}

function swap<T>(arr: T[], index1: number, index2: number): boolean {
	if (
		index1 >= 0 && index1 < arr.length &&
		index2 >= 0 && index2 < arr.length &&
		arr[index1] > arr[index2]          // compare values, not indices
	) {
		[arr[index1], arr[index2]] = [arr[index2], arr[index1]];
		return true;
	}
	return false;
}

export default makeScene2D(function* (view) {
  const rectangles = Array.from({length: 18}, () => createRef<Rect>());
  const random = useRandom(12321);

  rectangles.forEach((ref, i) => {
    view.add(<Rect
		ref={ref}
		size={[60, random.nextInt(10, 500)]}
		bottom={[-900+106*i,250]}
		stroke={'white'}
		lineWidth={4}/>);
    });

	// displaying the rects
	yield* all(...rectangles.map(ref => appearRect(ref())));

	// sorting the rects

	let array = rectangles.map(ref => ref().height());
let end_point = array.length;

const totalSteps = (array.length * (array.length - 1)) / 2;
let step = 0;

// 1 = normal speed at the start, 0.08 = very fast at the end
const speedAt = (s: number) => {
	const t = s / totalSteps;               // progress from 0 to 1
	return 1 - t * 0.92;                    // linear ramp: 1 -> 0.08
};

while (end_point > 1) {
	for (let i = 0; i < end_point - 1; i++) {
		const k = speedAt(step++);

		yield* all(
			rectangles[i]().stroke('blue', 0.3 * k),
			rectangles[i + 1]().stroke('blue', 0.3 * k),
		);

		if (swap(array, i, i + 1)) {
			yield* all(
				rectangles[i]().height(array[i], 0.5 * k),
				rectangles[i + 1]().height(array[i + 1], 0.5 * k),
				rectangles[i]().bottom.y(250, 0.5 * k),
				rectangles[i + 1]().bottom.y(250, 0.5 * k),
			);
		}

		yield* all(
			rectangles[i]().stroke('white', 0.3 * k),
			rectangles[i + 1]().stroke('white', 0.3 * k),
		);
	}
	yield* rectangles[end_point - 1]().stroke('green', 0.3);
	end_point -= 1;
}
yield* rectangles[0]().stroke('green', 0.3);

	// hiding the rects
	yield* all(...rectangles.map(ref => disappear(ref())));


// ---------- bye bye outro ----------
const items = [
	{text: ' حاول تطبيق ما شاهدته للتو', indent: 0},
	{text: ' شاهد الفيديو مرة أخرى وقارن حلّك بحلّي', indent: 0},
	{text: ' إذا نجحت', indent: 0},
	{text: ' أخبرنا في التعليقات', indent: 1},
	{text: ' إذا فشلت', indent: 0},
	{text: ' ارجع إلى السطر 1', indent: 1},
];

const right = 400;
const startY = -200;
const stepY = 90;
const lineY = (i: number) => startY + i * stepY;

const outro = items.map(() => createRef<Txt>());

items.forEach((it, i) => {
	view.add(
		<Txt
			ref={outro[i]}
			text=""
			textDirection="rtl"
			fontFamily="'Noto Sans Arabic', 'Cairo', Arial, sans-serif"
			fontSize={44}
			fill="white"
			offset={[1, 0]}
			position={[right - it.indent * 70, lineY(i)]}
		/>,
	);
});

// type the checklist line by line
for (let i = 0; i < items.length; i++) {
	yield* outro[i]().text(items[i].text, items[i].text.length * 0.04);
	yield* waitFor(0.2);
}
yield* waitFor(1);

// fade out and say bye
yield* all(...outro.map(r => r().opacity(0, 0.5)));

const bye = createRef<Txt>();
view.add(
	<Txt
		ref={bye}
		text=""
		textDirection="rtl"
		fontFamily="'Noto Sans Arabic', 'Cairo', Arial, sans-serif"
		fontSize={90}
		fill="white"
	/>,
);
yield* bye().text('مع السلامة 👋', 0.8);
yield* waitFor(1.5);
yield* bye().opacity(0, 0.5);


});