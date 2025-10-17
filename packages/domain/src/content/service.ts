/**
 * Content Domain - Service (stub)
 */

import type { ContentRepository } from './repository';
import { NotFoundError } from '@tenerife.music/shared';

export interface ContentServiceDependencies {
  contentRepository: ContentRepository;
}

export class ContentService {
  constructor(private deps: ContentServiceDependencies) {}

  async getArticleBySlug(slug: string, locale: string) {
    const article = await this.deps.contentRepository.findArticleBySlug(slug, locale);
    if (!article) {
      throw new NotFoundError('Article', slug);
    }
    return article;
  }

  // TODO: Implement article CRUD, category management, SEO slug handling per locale
}
