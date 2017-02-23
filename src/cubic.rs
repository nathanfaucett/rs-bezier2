use vec2;
use num::Num;


#[inline(always)]
pub fn cubic<'a, 'b, T: Num, N: Num>(
    out: &'a mut [T; 2], p0: &'b [T; 2], p1: &'b [T; 2], p2: &'b [T; 2], p3: &'b [T; 2], t: N
) ->  &'a mut [T; 2] {
    if t <= N::zero() {
        vec2::copy(out, p0)
    } else if t >= N::one() {
        vec2::copy(out, p3)
    } else {
        let t_f64 = t.to_f64();
        let one_min_t = 1_f64 - t_f64;
        let one_min_t_sq = one_min_t * one_min_t;
        let one_min_t_cb = one_min_t_sq * one_min_t;
        let t_sq = t_f64 * t_f64;
        let t_cb = t_sq * t_f64;

        vec2::set(out,
            T::from_f64(
                one_min_t_cb * p0[0].to_f64() + 3_f64 * one_min_t_sq * t_f64 * p1[0].to_f64() +
                3_f64 * one_min_t * t_sq * p2[0].to_f64() + t_cb * p3[0].to_f64()
            ),
            T::from_f64(
                one_min_t_cb * p0[1].to_f64() + 3_f64 * one_min_t_sq * t_f64 * p1[1].to_f64() +
                3_f64 * one_min_t * t_sq * p2[1].to_f64() + t_cb * p3[1].to_f64()
            )
        )
    }
}
#[test]
fn test_cubic() {
    assert_eq!(cubic(&mut [0, 0], &[0, 0], &[0, 200], &[200, 200], &[200, 0], 0.25), &[31, 112]);
    assert_eq!(cubic(&mut [0, 0], &[0, 0], &[0, 200], &[200, 200], &[200, 0], 0.5), &[100, 150]);
    assert_eq!(cubic(&mut [0, 0], &[0, 0], &[0, 200], &[200, 200], &[200, 0], 0.75), &[168, 112]);
}
