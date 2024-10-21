use anchor_lang::prelude::*;
pub mod constant;
pub mod states;

use crate::{constant::*, states::*};

declare_id!("EL9aNbpEHv9cQJFLUBwyXLPaWCGjQNiCndSK8Xg5FKJZ");

#[program]
pub mod blog {

    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, name: String, avatar: String) -> Result<()> {
        let authority = &mut ctx.accounts.authority;
        let user = &mut ctx.accounts.user;

        user.name = name;
        user.avatar = avatar;
        user.last_post_id = 0;
        user.total_posts = 0;
        user.authority = authority.key();

        Ok(())
    }

    pub fn create_post(
        ctx: Context<CreatePost>,
        title: String,
        content: String,
        image: String,
    ) -> Result<()> {
        let authority = &mut ctx.accounts.authority;
        let user = &mut ctx.accounts.user;

        let post = &mut ctx.accounts.post;

        post.id = user.last_post_id;
        post.title = title;
        post.content = content;
        post.image = image;
        post.authority = authority.key();
        post.creator_pubkey = user.key();

        user.total_posts = user.total_posts.checked_add(1).unwrap();
        user.last_post_id = user.last_post_id.checked_add(1).unwrap();

        Ok(())
    }

    pub fn update_post(
        ctx: Context<UpdatePost>,
        title: String,
        content: String,
        image: String,
    ) -> Result<()> {
        let post = &mut ctx.accounts.post;

        // Update fields only if new values are provided.
        if !title.is_empty() {
            post.title = title;
        }

        if !content.is_empty() {
            post.content = content;
        }

        if !image.is_empty() {
            post.image = image;
        }

        Ok(())
    }
    pub fn delete_post(ctx: Context<DeletePost>) -> Result<()> {
        let user = &mut ctx.accounts.user;

        if user.total_posts > 0 {
            user.total_posts = user.total_posts.checked_sub(1).unwrap();
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds= [USER_SEED, authority.key().as_ref()],
        bump,
        space=3000+8
    )]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut, 
        seeds=[USER_SEED, authority.key().as_ref()],
        bump,
        has_one=authority
    )]
    pub user: Account<'info, User>,

    #[account(
        init,
        seeds=[POST_SEED, authority.key().as_ref(), &[user.last_post_id as u8].as_ref()],
        payer=authority,
        bump,
        space=3000+8
    )]
    pub post: Account<'info, Post>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut, 
        seeds=[POST_SEED, authority.key().as_ref(), &[post.id as u8].as_ref()],
        bump,
        has_one = authority
    )]
    pub post: Account<'info, Post>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut, 
        seeds=[USER_SEED, authority.key().as_ref()],
        bump,
        has_one=authority
    )]
    pub user: Account<'info, User>,

    #[account(
        mut, 
        seeds=[POST_SEED, authority.key().as_ref(), &[post.id as u8].as_ref()],
        bump,
        has_one = authority,
        close=authority
    )]
    pub post: Account<'info, Post>,

    pub system_program: Program<'info, System>,
}
