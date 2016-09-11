use vec2;
use num::Num;


#[inline(always)]
pub fn linear<'a, 'b, T: Num, N: Num>(
    out: &'a mut [T; 2], p0: &'b [T; 2], p1: &'b [T; 2], t: N
) ->  &'a mut [T; 2] {
    if t <= N::zero() {
        vec2::copy(out, p0)
    } else if t >= N::one() {
        vec2::copy(out, p1)
    } else {
        vec2::lerp(out, p0, p1, t)
    }
}
#[test]
fn test_linear() {
    assert_eq!(linear(&mut [0, 0], &[0, 0], &[200, 0], 0.25), &[50, 0]);
    assert_eq!(linear(&mut [0, 0], &[0, 0], &[200, 0], 0.5), &[100, 0]);
    assert_eq!(linear(&mut [0, 0], &[0, 0], &[200, 0], 0.75), &[150, 0]);
}
