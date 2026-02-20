package com.roima.HRMS.specification;

import com.roima.HRMS.dtos.request.TravelExpenseFilterDTO;
import com.roima.HRMS.entites.TravelExpense;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Slf4j
public class TravelExpenseSpecification {
    public static Specification<TravelExpense> withFilters(TravelExpenseFilterDTO filter) {

        Specification<TravelExpense> spec = Specification.not(null);

        if (filter.getUserId() != null) {
            spec = spec.and(hasUserId(filter.getUserId()));
        }

         if (filter.getStatus() != null) {
            spec = spec.and(hasStatus(filter.getStatus()));
        }
        if (filter.getExpenseStartDate() != null || filter.getExpenseEndDate() != null) {
               spec = spec.and(hasExpenseDateBetween(
                    filter.getExpenseStartDate(),
                    filter.getExpenseEndDate()
            ));
        }



        if (filter.getTravelId() != null) {
            spec = spec.and(hasTravelId(filter.getTravelId()));
        }

        return spec;
    }

    private static Specification<TravelExpense> hasUserId(Long userId) {
       // log.info("1 {}",userId);

        return (root, query, cb)
                  -> cb.equal(root.join("traveler").join("user").get("id"), userId);
    }

    private static Specification<TravelExpense> hasTravelId(Long travelId) {
        //log.info("2 {}",travelId);
         return (root, query, cb) ->
                   cb.equal(root.join("traveler").join("travel").get("id"), travelId);
     }

     private static Specification<TravelExpense> hasStatus(String status) {
           // log.info("3 {}",status);
        return (root, query, cb) ->
                cb.equal(root.get("status"), status);
    }

    private static Specification<TravelExpense> hasExpenseDateBetween(
            LocalDateTime start, LocalDateTime end) {
        return (root, query, cb) -> {
            if (start == null) return cb.lessThanOrEqualTo(root.get("expenseDate"), end);
            if (end == null) return cb.greaterThanOrEqualTo(root.get("expenseDate"), start);
            //log.info("3 {}",cb);
            return cb.between(root.get("expenseDate"), start, end);
        };
    }
}
