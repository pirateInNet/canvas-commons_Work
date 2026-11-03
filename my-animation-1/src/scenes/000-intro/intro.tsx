import {Latex, makeScene2D, Txt, Shape, Img} from '@canvas-commons/2d';
import {all, createRef, ThreadGenerator, waitFor} from '@canvas-commons/core';

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

export default makeScene2D(function* (view) {
	const logo = createRef<Img>();
	const qrcode = createRef<Img>();
    const text1 = createRef<Txt>();
	const text2 = createRef<Txt>();


    view.add(<>
		<Img
	      ref={logo}
	      src="src/scenes/000-intro/logo.svg"
	      height={1080}
	      radius={0}
		  alpha={0}
	    />
		<Img
	      ref={qrcode}
	      src="src/scenes/000-intro/qrcode.svg"
	      width={900}
	      radius={0}
		  alpha={0}
	    />
        <Txt
			ref={text1}
			fill={"white"}
			fontFamily={"monospace"}
			fontSize={80}
			//width={1800}
			wrap={true}>
		</Txt>
		<Txt
			ref={text2}
			fill={"white"}
			fontFamily={"monospace"}
			fontSize={80}
			//width={1800}
			y={120}>
		</Txt>
    </>)


	yield* logo().alpha(1, 1).to(0, 2);
	yield* qrcode().alpha(1, 2).to(0, 2.5);

    yield* text1().text("السلام عليكم في أول فيديو في القناة", 2.5);
    yield* text1().text("في هادا الفيديو سأقوم بشرح خوارزمية", 2);

	yield* text2().text("bubble sort", 1);

	yield* all(
		text1().text("سأقوم باستخدام لغة", 2),
		text2().text("Python3", 2)
	);

	yield* waitFor(1);

	yield* all(
		text1().text("لكي نقوم بفرز", 1.5),
		text2().text("array", 1.5)
	);
	yield* waitFor(1);
	yield* all(
		text1().text("يجب أن يكون لدينا", 1.5),
		text2().text("array مسبقا",2)
	);
	yield* waitFor(1);
	yield* all(
		text1().text("الخطوة 1 صنع برنامج يقوم بتوليد", 2),
		text2().text("array عشوائي",2)
	);

	yield* waitFor(2);
	yield* all(
		text1().text("", 1.5),
		text2().text("", 1.5)
	);
});
