import Replicate from 'replicate';

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export interface ReplicateModel {
  id: string;
  name: string;
  description: string;
  visibility: string;
  github_url?: string;
  paper_url?: string;
  license_url?: string;
  cover_image_url?: string;
}

export interface ImageGenerationOptions {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  guidance_scale?: number;
  num_inference_steps?: number;
  seed?: number;
}

export interface TextAnalysisOptions {
  text: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
}

export class ReplicateService {
  // Search for models
  static async searchModels(query: string): Promise<ReplicateModel[]> {
    try {
      const models = await replicate.models.search(query);
      return models.results.map((model: unknown) => {
        const modelData = model as {
          name: string;
          description: string;
          visibility: string;
          github_url?: string;
          paper_url?: string;
          license_url?: string;
          cover_image_url?: string;
        };
        return {
          id: modelData.name,
          name: modelData.name,
          description: modelData.description,
          visibility: modelData.visibility,
          github_url: modelData.github_url,
          paper_url: modelData.paper_url,
          license_url: modelData.license_url,
          cover_image_url: modelData.cover_image_url,
        };
      });
    } catch (error) {
      console.error('Error searching models:', error);
      throw new Error('Failed to search models');
    }
  }

  // Generate image using AI models
  static async generateImage(options: ImageGenerationOptions): Promise<string[]> {
    try {
      const model = options.model || 'black-forest-labs/flux-schnell';
      
      const input = {
        prompt: options.prompt,
        width: options.width || 1024,
        height: options.height || 1024,
        guidance_scale: options.guidance_scale || 7.5,
        num_inference_steps: options.num_inference_steps || 50,
        ...(options.seed && { seed: options.seed }),
      };

      const output = await replicate.run(model as `${string}/${string}`, { input });
      
      // Handle different output formats
      if (Array.isArray(output)) {
        return output as string[];
      } else if (typeof output === 'string') {
        return [output];
      } else {
        throw new Error('Unexpected output format from model');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }

  // Analyze text using AI models
  static async analyzeText(options: TextAnalysisOptions): Promise<string> {
    try {
      const model = options.model || 'meta/llama-2-70b-chat';
      
      const input = {
        prompt: options.text,
        max_tokens: options.max_tokens || 500,
        temperature: options.temperature || 0.7,
      };

      const output = await replicate.run(model as `${string}/${string}`, { input });
      
      if (typeof output === 'string') {
        return output;
      } else if (Array.isArray(output)) {
        return output.join('');
      } else {
        return String(output);
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw new Error('Failed to analyze text');
    }
  }

  // Generate crypto market insights using AI
  static async generateMarketInsight(marketData: Record<string, unknown>, prompt: string): Promise<string> {
    try {
      const enhancedPrompt = `
        Based on the following cryptocurrency market data, ${prompt}
        
        Market Data:
        ${JSON.stringify(marketData, null, 2)}
        
        Please provide a detailed analysis including:
        1. Key trends and patterns
        2. Risk assessment
        3. Potential opportunities
        4. Market sentiment analysis
        
        Keep the response professional and suitable for crypto investors.
      `;

      return await this.analyzeText({
        text: enhancedPrompt,
        model: 'meta/llama-2-70b-chat',
        max_tokens: 1000,
        temperature: 0.7,
      });
    } catch (error) {
      console.error('Error generating market insight:', error);
      throw new Error('Failed to generate market insight');
    }
  }

  // Generate educational content about crypto concepts
  static async generateEducationalContent(topic: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<string> {
    try {
      const prompt = `
        Create educational content about "${topic}" in cryptocurrency and blockchain technology.
        Target audience: ${level} level
        
        Please include:
        1. Clear explanation of the concept
        2. Real-world examples
        3. Key benefits and risks
        4. Practical applications
        5. Common misconceptions to avoid
        
        Make it engaging and easy to understand while being technically accurate.
      `;

      return await this.analyzeText({
        text: prompt,
        model: 'meta/llama-2-70b-chat',
        max_tokens: 1500,
        temperature: 0.8,
      });
    } catch (error) {
      console.error('Error generating educational content:', error);
      throw new Error('Failed to generate educational content');
    }
  }

  // Generate visualization prompts for charts and graphs
  static async generateVisualizationPrompt(dataType: string, chartType: string): Promise<string> {
    try {
      const prompt = `
        Create a detailed description for visualizing ${dataType} data using a ${chartType} chart.
        Include:
        1. Visual elements and styling
        2. Color scheme recommendations
        3. Key data points to highlight
        4. Interactive features
        5. Professional design considerations
        
        Make it suitable for a cryptocurrency analysis dashboard.
      `;

      return await this.analyzeText({
        text: prompt,
        model: 'meta/llama-2-70b-chat',
        max_tokens: 800,
        temperature: 0.6,
      });
    } catch (error) {
      console.error('Error generating visualization prompt:', error);
      throw new Error('Failed to generate visualization prompt');
    }
  }
} 