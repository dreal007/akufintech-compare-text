/**
 * @description Subscription Processor to handle all DB calls
 */

const { Comparisons } = require('../database/models')
 
const createComparison = (payload: any) => {
  const query = {
    where: {
      first_student_name: payload.first_student_name,
      first_student_text: payload.first_student_text,
      second_student_name: payload.second_student_name,
      second_student_text: payload.second_student_text
     }
  }
  return Comparisons.findOne(query).then((existingComparison: any) => {
    if (existingComparison) {
      const query = {
        where: {
          comparison_id: existingComparison.dataValues.comparison_id
        }
      }
      payload.comparison_id = existingComparison.dataValues.comparison_id

      return Comparisons.update(payload, query).then((updatedComparison: any) => {
        if(!updatedComparison[0]) throw new Error('Could not update comparison')
        return Comparisons.findOne(query)
      })
      .then((result: any) => {
         return result
      })
    }
    return Comparisons.create(payload)
  })
  .then((result: any) => {
    if (!result) throw new Error('Could not save comparison')
    return result
  })
}

const getComparisons = () => {
  const query = {
    attributes: {
      exclude : ['id', 'first_student_text', 'second_student_text', 'comparison_id']
    }
  }
  return Comparisons.findAll(query).then((comparisons: any) => {
    if (!comparisons) throw new Error('No comparison history found')
    return comparisons
  })
}

const getComparisonById = (comparison_id: any) => {
  const query = {
    where: {
      comparison_id: comparison_id
    }
  }

  return Comparisons.findOne(query).then((comparison: any) => {
    if (!comparison) throw new Error('No comparison history found')
    return comparison
  })
}

export { createComparison, getComparisons, getComparisonById }