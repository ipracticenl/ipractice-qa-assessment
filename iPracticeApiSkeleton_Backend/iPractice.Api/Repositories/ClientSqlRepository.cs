using iPractice.Api.Models.Clients;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Data;

namespace iPractice.Api.Repositories;

public class ClientSqlRepository(ApplicationDbContext dbContext) : IClientSqlRepository
{
    public async Task<IEnumerable<Client>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Clients.ToListAsync(cancellationToken);
    }

    public async Task<Client> GetClientByIdAsync(long id, CancellationToken cancellationToken)
    {
        var psychologist = await dbContext.Clients.SingleOrDefaultAsync(x => x.Id == id, cancellationToken);
        return psychologist;
    }

    public async Task<Client> GetClientByNameAsync(string name, CancellationToken cancellationToken)
    {
        var client = await dbContext.Clients.SingleOrDefaultAsync(x => x.Name == name, cancellationToken);
        return client;
    }

    public async Task<List<Client>> GetClientsByIdsAsync(List<long> ids, CancellationToken cancellationToken)
    {
        var clients = await dbContext.Clients
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);

        return clients;
    }

    public async Task<Client> AddClientAsync(Client client, CancellationToken cancellationToken)
    {
        await dbContext.Clients.AddAsync(client, cancellationToken);
        await SaveChangesAsync(cancellationToken);

        return client;
    }

    public async Task DeleteClientAsync(Client client, CancellationToken cancellationToken)
    {
        dbContext.Clients.Remove(client);
        await SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken) =>
        await dbContext.SaveChangesAsync(cancellationToken);
    
    public async Task LogAppointmentCommentAsync(long clientId, string comment, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(comment))
        {
            var sql = $"UPDATE ClientScheduledAppointments SET Comment = '{comment}' WHERE ClientId = {clientId}";
            
            try
            {
                await dbContext.Database.ExecuteSqlRawAsync(sql, cancellationToken);
            }
            catch
            {
            }
        }
    }
}