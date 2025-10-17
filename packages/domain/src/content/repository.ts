/**
 * Content Domain - Repository Interface
 */

import type { Article, ArticleI18n, Category, ArticleStatus } from '@prisma/client';
import type { PaginatedResult } from '@tenerife.music/shared';

export interface ArticleWithI18n extends Article {
  i18n?: ArticleI18n[];
  categories?: any[];
  tags?: any[];
}

export interface ArticleFilters {
  status?: ArticleStatus;
  authorId?: string;
  orgId?: string;
  categoryIds?: string[];
  locale?: string;
  slug?: string;
}

export interface ContentRepository {
  // Articles
  findArticleById(id: string): Promise<ArticleWithI18n | null>;
  findArticleBySlug(slug: string, locale: string): Promise<ArticleWithI18n | null>;
  findArticles(
    filters: ArticleFilters,
    pagination: { page: number; limit: number }
  ): Promise<PaginatedResult<ArticleWithI18n>>;
  createArticle(data: any): Promise<Article>;
  updateArticle(id: string, data: any): Promise<Article>;
  softDeleteArticle(id: string): Promise<void>;

  // Categories
  findCategories(): Promise<Category[]>;
  createCategory(data: any): Promise<Category>;
}
