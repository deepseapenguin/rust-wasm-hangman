mod utils;

use rand::Rng;
use regex::Regex;
use wasm_bindgen::prelude::*;

// // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// // allocator.
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

static ALL_5: &'static str = include_str!("5_char_words.txt");
static ALL_6: &'static str = include_str!("6_char_words.txt");
static ALL_7: &'static str = include_str!("7_char_words.txt");

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn get_word(input: String, target: i32) -> String {
  let mut rng = rand::thread_rng();

  let regex_str = format!("^[^{}{}]*$", input.to_uppercase(), input.to_lowercase());
  let regex = Regex::new(&regex_str).unwrap();
  let mut match_case: Vec<String> = vec![];

  let all = if target == 5 {
    ALL_5
  } else if target == 6 {
    ALL_6
  } else {
    ALL_7
  };

  for text in all.split("\n").collect::<Vec<&str>>() {
    // println!("{}", text);

    if regex.is_match(&text) {
      match_case.push(text.to_string());
    }
  }
  let index = rng.gen_range(0..match_case.len());
  let show = match_case[index]
    .to_uppercase()
    .split("")
    .collect::<Vec<&str>>()
    .join(" ");
  show
}
