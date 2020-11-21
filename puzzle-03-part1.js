"use strict";
const fs = require("fs");

function nextPoint({x, y}, wireSegment) {
    const op = wireSegment.charAt(0);
    const num = Number(wireSegment.substring(1));
    const sign = op === "U" || op ==="R" ? 1 : -1;
    x += op === "R" || op === "L" ? sign * num : 0;
    y += op === "U" || op === "D" ? sign * num : 0;

    return {x, y};
}

function wireOpsToSegments(wireOps) {
    let origin = {x: 0, y: 0, pathLen: 0};
    return wireOps.map(op => {
        const endPoint = nextPoint(origin , op);
        const result = { p1: origin, p2: endPoint};
        origin = endPoint;
        return result;
    });
}

function isPerpendicular({p1, p2}) {
    return p1.x === p2.x;
}

function hasOpposingOrientation(segment1, segment2) {
    return isPerpendicular(segment1) ? !isPerpendicular(segment2) : isPerpendicular(segment2);
}

function intersection(segment1, segment2) {
    if (!hasOpposingOrientation(segment1, segment2)) {
        return null;
    }
    const perpendicular = isPerpendicular(segment1) ? segment1 : segment2;
    const horizontal = perpendicular === segment1 ? segment2 : segment1;
    const xIntersects = (perpendicular.p1.x > horizontal.p1.x && perpendicular.p1.x < horizontal.p2.x) ||
        (perpendicular.p1.x < horizontal.p1.x && perpendicular.p1.x > horizontal.p2.x);
    const yIntersects = (horizontal.p1.y > perpendicular.p1.y && horizontal.p1.y < perpendicular.p2.y) ||
        (horizontal.p1.y < perpendicular.p1.y && horizontal.p1.y > perpendicular.p2.y);
    return xIntersects && yIntersects ? {x: perpendicular.p1.x, y: horizontal.p1.y} : null;
}

function manhattanDist(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

const [wire1In, wire2In] = fs.readFileSync('./input-files/puzzle-03.txt', 'utf-8').split("\n");
//const wire1In = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51";
//const wire2In = "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7";
const wire1Ops = wire1In.split(",");
const wire2Ops = wire2In.split(",");
const wire1Segs = wireOpsToSegments(wire1Ops);
const wire2Segs = wireOpsToSegments(wire2Ops);
const origin = {x: 0, y: 0};

const minDist = wire1Segs.flatMap(segment1 => wire2Segs.map(segment2 => { return {segment1, segment2}}))
    .map(segPair => intersection(segPair.segment1, segPair.segment2))
    .filter(intersection => intersection !== null)
    .map(intersection => manhattanDist(origin, intersection))
    .reduce((dist1, dist2) => dist1 < dist2 ? dist1 : dist2, Number.MAX_SAFE_INTEGER);

console.log(minDist);

