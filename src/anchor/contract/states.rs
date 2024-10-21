use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct User {
    pub name: String,
    pub avatar: String,
    pub last_post_id: u8,
    pub total_posts: u8,
    pub authority: Pubkey,
}
#[account]
#[derive(Default)]
pub struct Post {
    pub id: u8,
    pub title: String,
    pub content: String,
    pub image: String,
    pub authority: Pubkey,
    pub creator_pubkey: Pubkey,
}
