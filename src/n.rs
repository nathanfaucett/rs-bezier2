use vec2;
use num::Num;

use cubic::cubic;
use linear::linear;
use quadratic::quadratic;


#[inline]
pub fn n<'a, 'b, T: Num, N: Num>(
    out: &'a mut [T; 2], points: &'b [&'b [T; 2]], t: N
) ->  &'a mut [T; 2] {
    if t <= N::zero() {
        match points.len() {
            0 => vec2::zero(out),
            _ => vec2::copy(out, points[0]),
        }
    } else if t >= N::one() {
        match points.len() {
            0 => vec2::zero(out),
            n => vec2::copy(out, points[n - 1]),
        }
    } else {
        match points.len() {
            0 => vec2::zero(out),
            1 => vec2::copy(out, points[0]),
            2 => linear(out, points[0], points[1], t),
            3 => quadratic(out, points[0], points[1], points[2], t),
            4 => cubic(out, points[0], points[1], points[2], points[3], t),
            n => vec2::copy(out, &casteljau(points, n - 1, 0, t.to_f64())),
        }
    }
}

#[inline]
fn casteljau<'a, T: Num>(points: &'a [&'a [T; 2]], i: usize, j: usize, t: f64) -> [T; 2] {
    if i == 0_usize {
        vec2::clone(points[j])
    } else {
        let p0 = casteljau(points, i - 1, j, t);
        let p1 = casteljau(points, i - 1, j + 1, t);

        vec2::new(
            T::from_f64((1_f64 - t) * p0[0].to_f64() + t * p1[0].to_f64()),
            T::from_f64((1_f64 - t) * p0[1].to_f64() + t * p1[1].to_f64())
        )
    }
}

#[test]
fn test_n() {
    assert_eq!(n(&mut [0, 0], &[], 0), &[0, 0]);
    assert_eq!(n(&mut [0, 0], &[], 0.5), &[0, 0]);
    assert_eq!(n(&mut [0, 0], &[], 1), &[0, 0]);

    assert_eq!(n(&mut [0, 0], &[&[0, 0], &[0, 200], &[200, 200], &[200, 0]], 0.25), &[31, 112]);
    assert_eq!(n(&mut [0, 0], &[&[0, 0], &[0, 200], &[200, 200], &[200, 0]], 0.5), &[100, 150]);
    assert_eq!(n(&mut [0, 0], &[&[0, 0], &[0, 200], &[200, 200], &[200, 0]], 0.75), &[168, 112]);
}
