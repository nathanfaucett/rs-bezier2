#![no_std]


extern crate num;
extern crate vec2;


mod cubic;
mod linear;
mod n;
mod quadratic;


pub use cubic::cubic;
pub use linear::linear;
pub use n::n;
pub use quadratic::quadratic;
