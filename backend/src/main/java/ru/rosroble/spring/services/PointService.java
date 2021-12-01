package ru.rosroble.spring.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.rosroble.spring.models.Point;
import ru.rosroble.spring.models.User;
import ru.rosroble.spring.repositories.PointRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class PointService {

    @PersistenceContext
    private EntityManager em;
    @Autowired
    PointRepository pointRepository;


    public List<PointRepository.NoUserInfo> getAllPointsByInitiator(User user) {
        List<PointRepository.NoUserInfo> points = pointRepository.findAllByInitiator(user);
        return points;
    }

    public boolean savePoint(Point p) {
        pointRepository.save(p);
        return true;
    }



}
