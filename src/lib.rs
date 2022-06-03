#[macro_use]
extern crate lazy_static;

use std::collections::HashMap;

use rand::Rng;
use regex::Regex;
use wasm_bindgen::prelude::*;

lazy_static! {
  static ref ALL_WORD: HashMap<i32, Vec<&'static str>> = {
    let mut m = HashMap::new();
    m.insert(5, get_word_from_file(include_str!("5_letter_words.txt")));
    m.insert(6, get_word_from_file(include_str!("6_letter_words.txt")));
    m
  };
}

fn get_word_from_file(target: &'static str) -> Vec<&'static str> {
  // let target = format!("{}_char_words.txt", len);
  target.split(",").collect::<Vec<&'static str>>()
}

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

  let all = ALL_WORD.get(&target).unwrap();

  for text in all {
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
