import { Router } from 'express';
import { getNews } from '../controllers/news.controllers/get.news';

export const newsRouter = Router();

newsRouter.get('/', getNews);
