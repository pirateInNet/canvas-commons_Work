import {Code, Video, makeScene2D} from '@canvas-commons/2d';
import {waitFor, createRef} from '@canvas-commons/core';

import vid1 from '../../../videos/vid1.mp4';

export default makeScene2D(function* (view) {
    const code = createRef<Code>();
	const vidRef = createRef<Video>();
    view.add(
		<Code
	      ref={code}
	      fontSize={52}
	      fontFamily={'JetBrains Mono, monospace'}
	      anchorX={-1}
	      x={-900}
		  y={-20}
    />,
	);

	let n = 4;

	yield* code().code(
	`\
# [ ] write a code that generates a random array
	`, n/2).to(
	`\
from random import randint as rn
# rn(n1,n2)
# دالة تقوم بارجاع قيمة عددية عشوائية
# محصورة بين الرقمين
# n1 و n2
	`,n).to(
	`\
from random import randint as rn
array = []
# نقوم بانشاء
# array
# فارغة
	`,n).to(
	`\
from random import randint as rn
array = []
for i in range(0, rn(5, 10)): # من أجل أن يكون الطول عشوائي
	`,n).to(
	`\
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
# نقوم باضافة أعداد عشوائية
	`,n).to(
	`\
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
# بقي لنا أن نتحقق من النتيجة
	`,n).to(
	`\
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
print(f"""
the array is {array}
length is {len(array)}
""")
`,n).to(``,1);
	waitFor(2);
	view.add(<Video ref={vidRef} src={vid1} playbackRate={2}/>);
	vidRef().play();
	yield* vidRef().scale(1.25, 1).to(1.25,19);
	yield* vidRef().alpha(0, 1);

	yield* code().code(
	`\
# [ ] write a code that generates a random array
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
print(f"""
the array is {array}
length is {len(array)}
	`, n/2).to(`\
# [x] write a code that generates a random array
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
print(f"""
the array is {array}
length is {len(array)}
	`,n).to(`\
# [ ] implement the sorting algorithm
	`,n).to(`\
from random import randint as rn
array = []
for i in range(0, rn(5, 10)):
    array.append(rn(0, 100))
	`,n).to(`\
...
step = 1 # to count steps the algo took to sort the array
	`,n).to(`\
...
step = 1
while True:
	pass
# we need to go in a loop over & over
	`,n).to(`\
...
step = 1
while True:
	pass
# but we don't need to go for all numbers in every turn
	`,n).to(`\
...
step = 1
while True:
	for i in range(0, end_point):
		pass
	end_point -= 1 # so, the loop we be shorter & shorter
	`,n).to(`\
...
step = 1
while True:
	for i in range(0, end_point):
		if array[i] > array[i + 1]:
			# if the number in the left is larger
			pass
	end_point -= 1 # so, the loop we be shorter & shorter
	`,n).to(`\
...
step = 1
while True:
	for i in range(0, end_point):
		if array[i] > array[i + 1]:
			array[i], array[i + 1] = array[i + 1], array[i]
			# flip them
		print(f"step {step}:{array} & end_point = {end_point}")
	end_point -= 1
	`,n).to(`\
...
step = 1
while True:
	for i in range(0, end_point):
		if array[i] > array[i + 1]:
			array[i], array[i + 1] = array[i + 1], array[i]
		print(f"step {step}:{array} & end_point = {end_point}")
	end_point -= 1
	`,n)
});
