import { NextRequest, NextResponse } from 'next/server';
import { ReplicateService } from '@/lib/replicate-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const query = searchParams.get('query');

    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'search-models':
        if (!query) {
          return NextResponse.json(
            { error: 'Query parameter is required for model search' },
            { status: 400 }
          );
        }
        const models = await ReplicateService.searchModels(query);
        return NextResponse.json({ models });

      case 'get-models':
        // Return popular models for crypto analysis
        const popularModels = [
          {
            id: 'black-forest-labs/flux-schnell',
            name: 'FLUX.1 [schnell]',
            description: 'Fast image generation model',
            category: 'image-generation'
          },
          {
            id: 'meta/llama-2-70b-chat',
            name: 'Llama 2 70B Chat',
            description: 'Advanced text analysis and generation',
            category: 'text-analysis'
          },
          {
            id: 'stability-ai/stable-diffusion',
            name: 'Stable Diffusion',
            description: 'High-quality image generation',
            category: 'image-generation'
          }
        ];
        return NextResponse.json({ models: popularModels });

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Replicate API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'generate-image':
        const { prompt, model, width, height, seed } = params;
        if (!prompt) {
          return NextResponse.json(
            { error: 'Prompt is required for image generation' },
            { status: 400 }
          );
        }
        
        const images = await ReplicateService.generateImage({
          prompt,
          model,
          width,
          height,
          seed
        });
        
        return NextResponse.json({ images });

      case 'analyze-text':
        const { text, textModel, maxTokens, temperature } = params;
        if (!text) {
          return NextResponse.json(
            { error: 'Text is required for analysis' },
            { status: 400 }
          );
        }
        
        const analysis = await ReplicateService.analyzeText({
          text,
          model: textModel,
          max_tokens: maxTokens,
          temperature
        });
        
        return NextResponse.json({ analysis });

      case 'market-insight':
        const { marketData, insightPrompt } = params;
        if (!marketData || !insightPrompt) {
          return NextResponse.json(
            { error: 'Market data and prompt are required' },
            { status: 400 }
          );
        }
        
        const insight = await ReplicateService.generateMarketInsight(
          marketData,
          insightPrompt
        );
        
        return NextResponse.json({ insight });

      case 'educational-content':
        const { topic, level } = params;
        if (!topic) {
          return NextResponse.json(
            { error: 'Topic is required for educational content' },
            { status: 400 }
          );
        }
        
        const content = await ReplicateService.generateEducationalContent(
          topic,
          level || 'beginner'
        );
        
        return NextResponse.json({ content });

      case 'visualization-prompt':
        const { dataType, chartType } = params;
        if (!dataType || !chartType) {
          return NextResponse.json(
            { error: 'Data type and chart type are required' },
            { status: 400 }
          );
        }
        
        const visualPrompt = await ReplicateService.generateVisualizationPrompt(
          dataType,
          chartType
        );
        
        return NextResponse.json({ prompt: visualPrompt });

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Replicate API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 