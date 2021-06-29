/**
 * Module Dependencies
 */
 import { transformResponse as response, validateRequest} from '../utils/transform-response'
 import { Request, Response, NextFunction } from 'express'
 import { v4 as uuidv4 } from 'uuid'
 import { createComparison, getComparisonById, getComparisons } from '../processors/comparison'
 import { HttpStatusCode } from '../utils/exceptions/http-status-codes'
 
 /**
  * @description Compares text
  */
 
  const compare = async (req : Request, res : Response) => {
     if(!validateRequest(req, res)){
        const { first_student_name, first_student_text, second_student_name, second_student_text } = req.body
         let payload = {
           comparison_id: await uuidv4(),
           similarity: (compareTexts(first_student_text, second_student_text) * 100).toFixed(2) + '%',
           first_student_name,
           first_student_text,
           second_student_name,
           second_student_text,
           link : ''
         }
         
         payload.link = `${req.protocol}://${req.hostname}:${process.env.PORT}/compare/history/${payload.comparison_id}`
         
         createComparison(payload).then((newComparison :any ) => {
             res.status(HttpStatusCode.OK).json({message: 'Text compared successfully',data : newComparison});
         }).catch((error: any) => {
            console.log(error)
           res.status(HttpStatusCode.BAD_REQUEST).json({error: error.message});
         });
      }    
  }

  const compareTexts = (first:String, second:String, caseSensitive: boolean = false) => {
    first = caseSensitive ? first.replace(/\s+/g, '') : first.replace(/\s+/g, '').toLowerCase()
    second = caseSensitive ? second.replace(/\s+/g, '') : second.replace(/\s+/g, '').toLowerCase()

    if (first === second) return 1; // identical or empty
    if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;

      firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  }

/**
  * @description Fetch comparison history
  */
  const fetchComparisonsHistory = (req : Request, res : Response) => {
    if (!validateRequest(req, res)) {
      getComparisons().then((comparisons: any) => {
        res.status(HttpStatusCode.OK).json({message: 'Comparison history fetched successfully', data : comparisons});
      }).catch((error: any) => {
        console.log(error)
        res.status(HttpStatusCode.BAD_REQUEST).json({error: error.message});
      });
    }
  }

  /**
  * @description Fetch comparison detail
  */
  const fetchComparisonDetail = (req : Request, res : Response) => {
    if (!validateRequest(req, res)) {
      getComparisonById(req.params.comparison_id).then((comparisons: any) => {
        res.status(HttpStatusCode.OK).json({message: 'Comparison history fetched successfully', data : comparisons});
      }).catch((error: any) => {
        console.log(error)
        res.status(HttpStatusCode.BAD_REQUEST).json({error: error.message});
      });
    }
  }

 
  export {
    compare,
    fetchComparisonsHistory,
    fetchComparisonDetail
  }
 
  