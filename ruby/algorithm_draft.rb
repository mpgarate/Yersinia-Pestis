# def r(c = 5, b = 0.1, y = 1
def r(c = 15, b = 0.1, y = 5)
  c * b * y
end

def simulate(pop = 70000)
  deaths = 1
  generations = 0

  while (pop > 0)
    puts deaths.to_s + " / " + pop.to_s
    deaths = ((1 + r()) * deaths).ceil
    pop = pop - deaths

    generations += 1
  end

    puts "generations: #{generations}"
    puts deaths.to_s + " / " + pop.to_s
end

simulate()
