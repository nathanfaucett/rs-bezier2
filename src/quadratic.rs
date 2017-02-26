use vec2;
use num::Num;


#[inline]
pub fn quadratic<'a, 'b, T: Copy + Num, N: Copy + Num>(
    out: &'a mut [T; 2], p0: &'b [T; 2], p1: &'b [T; 2], p2: &'b [T; 2], t: N
) ->  &'a mut [T; 2] {
    if t <= N::zero() {
        vec2::copy(out, p0)
    } else if t >= N::one() {
        vec2::copy(out, p2)
    } else {
        let t_f64 = t.to_f64();
        let one_min_t = 1_f64 - t_f64;
        let one_min_t_sq = one_min_t * one_min_t;
        let t_sq = t_f64 * t_f64;

        vec2::set(out,
            T::from_f64(
                one_min_t_sq * p0[0].to_f64() + 2_f64 * one_min_t * t_f64 *
                p1[0].to_f64() + t_sq * p2[0].to_f64()
            ),
            T::from_f64(
                one_min_t_sq * p0[1].to_f64() + 2_f64 * one_min_t * t_f64 *
                p1[1].to_f64() + t_sq * p2[1].to_f64()
            )
        )
    }
}
#[test]
fn test_quadratic() {
    assert_eq!(quadratic(&mut [0, 0], &[0, 0], &[100, 200], &[200, 0], 0.25), &[50, 75]);
    assert_eq!(quadratic(&mut [0, 0], &[0, 0], &[100, 200], &[200, 0], 0.5), &[100, 100]);
    assert_eq!(quadratic(&mut [0, 0], &[0, 0], &[100, 200], &[200, 0], 0.75), &[150, 75]);
}
